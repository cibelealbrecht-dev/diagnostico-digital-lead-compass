CREATE OR REPLACE FUNCTION public.assign_initial_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND lower(NEW.email) = 'diagnosticodigital.ca@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS on_auth_user_confirmed_assign_admin ON auth.users;
CREATE TRIGGER on_auth_user_confirmed_assign_admin
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW
WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
EXECUTE FUNCTION public.assign_initial_admin();

REVOKE EXECUTE ON FUNCTION public.assign_initial_admin() FROM PUBLIC, anon, authenticated;

DELETE FROM public.user_roles ur
USING auth.users u
WHERE ur.user_id = u.id AND ur.role = 'admin'
  AND (lower(u.email) <> 'diagnosticodigital.ca@gmail.com' OR u.email_confirmed_at IS NULL);