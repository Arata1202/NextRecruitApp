import { supabase } from '@/libs/supabase';

export const useGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/service`,
    },
  });
};

export const useGithubLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/service`,
    },
  });
};

export const useTwitterLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: {
      redirectTo: `${window.location.origin}/service`,
    },
  });
};
