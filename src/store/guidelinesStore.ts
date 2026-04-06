import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface Guideline {
  id: string
  title: string
  category: string
  content: string
  status: string
  created_at: string
  updated_at: string
}

interface GuidelinesState {
  guidelines: Guideline[]
  loading: boolean
  fetchGuidelines: () => Promise<void>
  addGuideline: (guideline: Omit<Guideline, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateGuideline: (id: string, updates: Partial<Guideline>) => Promise<void>
  deleteGuideline: (id: string) => Promise<void>
}

export const useGuidelinesStore = create<GuidelinesState>((set) => ({
  guidelines: [],
  loading: false,

  fetchGuidelines: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('guidelines')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ guidelines: data || [] })
    } catch (error) {
      console.error('Error fetching guidelines:', error)
    } finally {
      set({ loading: false })
    }
  },

  addGuideline: async (guideline) => {
    const { error } = await supabase.from('guidelines').insert([guideline])
    if (error) throw error
  },

  updateGuideline: async (id, updates) => {
    const { error } = await supabase
      .from('guidelines')
      .update(updates)
      .eq('id', id)
    if (error) throw error
  },

  deleteGuideline: async (id) => {
    const { error } = await supabase.from('guidelines').delete().eq('id', id)
    if (error) throw error
  }
}))
