
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SavedSearch {
  id: string;
  user_id: string;
  search_criteria: {
    from: string;
    to: string;
    date: string;
    passengers: string;
    filters?: any;
  };
  created_at: string;
  updated_at: string;
}

export interface AlertPreferences {
  id: string;
  saved_search_id: string;
  email_notifications: boolean;
  phone_notifications: boolean;
  email_address?: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

export const useSavedSearches = () => {
  const queryClient = useQueryClient();

  const { data: savedSearches = [], isLoading } = useQuery({
    queryKey: ['saved-searches'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('saved_searches')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as SavedSearch[];
    }
  });

  const saveSearchMutation = useMutation({
    mutationFn: async (searchCriteria: SavedSearch['search_criteria']) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('saved_searches')
        .insert({
          user_id: user.user.id,
          search_criteria: searchCriteria
        })
        .select()
        .single();

      if (error) throw error;
      return data as SavedSearch;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-searches'] });
      toast.success('Search saved successfully!');
    },
    onError: (error) => {
      console.error('Error saving search:', error);
      toast.error('Failed to save search');
    }
  });

  const deleteSearchMutation = useMutation({
    mutationFn: async (searchId: string) => {
      const { error } = await supabase
        .from('saved_searches')
        .delete()
        .eq('id', searchId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-searches'] });
      toast.success('Search deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting search:', error);
      toast.error('Failed to delete search');
    }
  });

  return {
    savedSearches,
    isLoading,
    saveSearch: saveSearchMutation.mutateAsync,
    deleteSearch: deleteSearchMutation.mutateAsync,
    isSaving: saveSearchMutation.isPending,
    isDeleting: deleteSearchMutation.isPending
  };
};

export const useAlertPreferences = (savedSearchId?: string) => {
  const queryClient = useQueryClient();

  const { data: alertPreferences } = useQuery({
    queryKey: ['alert-preferences', savedSearchId],
    queryFn: async () => {
      if (!savedSearchId) return null;

      const { data, error } = await supabase
        .from('alert_preferences')
        .select('*')
        .eq('saved_search_id', savedSearchId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      return data as AlertPreferences | null;
    },
    enabled: !!savedSearchId
  });

  const saveAlertPreferencesMutation = useMutation({
    mutationFn: async (preferences: Omit<AlertPreferences, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('alert_preferences')
        .upsert(preferences, { onConflict: 'saved_search_id' })
        .select()
        .single();

      if (error) throw error;
      return data as AlertPreferences;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alert-preferences', savedSearchId] });
      toast.success('Alert preferences saved!');
    },
    onError: (error) => {
      console.error('Error saving alert preferences:', error);
      toast.error('Failed to save alert preferences');
    }
  });

  return {
    alertPreferences,
    saveAlertPreferences: saveAlertPreferencesMutation.mutateAsync,
    isSaving: saveAlertPreferencesMutation.isPending
  };
};
