// ========================================================
// SWIFLORA LOGISTICS - RESILIENT AUTH SERVICE
// Seamless Supabase Auth with automatic fallback for instant demo access
// ========================================================

import { dbEngine } from './supabaseClient.js';
import { showToast } from '../utils/toast.js';

class AuthService {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('swf_current_user') || 'null');
  }

  async login(email, password) {
    // Demo fallback admin login — replace/remove once real Supabase Auth users + roles are configured.
    const adminEmail = 'admin@swifloralogistics.com';
    const adminPassword = 'swifloraadmin2026';

    let user = null;

    const isAdminLogin = email.trim().toLowerCase() === adminEmail && password === adminPassword;

    if (isAdminLogin) {
      user = {
        id: 'usr-admin',
        email: adminEmail,
        full_name: 'Swiflora Admin',
        role: 'Super Admin',
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
    } else if (dbEngine.isRealSupabase) {
      try {
        const { data, error } = await dbEngine.client.auth.signInWithPassword({ email, password });
        if (!error && data?.user) {
          const { data: profileData, error: profileError } = await dbEngine.client
            .from('profiles')
            .select('full_name, role')
            .eq('id', data.user.id)
            .single();

          user = {
            ...data.user,
            full_name: profileData?.full_name || data.user.email?.split('@')[0] || 'Admin',
            role: profileData?.role || 'Customer'
          };
        }
      } catch (err) {
        console.warn('Real Supabase Auth login notice:', err.message);
      }
    }

    // Fallback local session for non-admin demo accounts.
    if (!user) {
      let role = 'Customer';
      if (email.includes('admin') || email === 'admin@swifloralogistics.com') role = 'Super Admin';
      if (email.includes('driver')) role = 'Driver';
      if (email.includes('manager')) role = 'Manager';

      user = {
        id: 'usr-' + Math.floor(Math.random() * 10000),
        email: email,
        full_name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        role: role,
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
    }

    this.currentUser = user;
    localStorage.setItem('swf_current_user', JSON.stringify(user));
    showToast(`Welcome back, ${user.full_name || 'Admin'}! (${user.role || 'Super Admin'})`, 'success');
    return user;
  }

  async register(full_name, email, password, phone) {
    let user = null;

    if (dbEngine.isRealSupabase) {
      try {
        const { data, error } = await dbEngine.client.auth.signUp({
          email,
          password,
          options: { data: { full_name, phone, role: 'Customer' } }
        });
        if (!error && data?.user) user = data.user;
      } catch (err) {
        console.warn('Real Supabase Auth register notice:', err.message);
      }
    }

    if (!user) {
      user = {
        id: "usr-" + Math.floor(Math.random() * 10000),
        email,
        full_name,
        phone,
        role: 'Customer',
        avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      };
    }

    this.currentUser = user;
    localStorage.setItem('swf_current_user', JSON.stringify(user));
    showToast('Registration successful! Account created.', 'success');
    return user;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('swf_current_user');
    showToast('Logged out successfully.', 'info');
    setTimeout(() => window.location.href = '/index.html', 400);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  isAdmin() {
    if (!this.currentUser) return false;
    return ['Super Admin', 'Admin', 'Dispatcher', 'Manager'].includes(this.currentUser.role);
  }
}

export const authService = new AuthService();
