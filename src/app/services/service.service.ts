import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  supabase = createClient(
    'https://fcxigfezkxjwgxgakhwm.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjeGlnZmV6a3hqd2d4Z2FraHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2Mzk2MzgsImV4cCI6MjAzNzIxNTYzOH0.MnSMcxJ7hod1Zngelu-k6jfJZwHC8gJwsgMGdHrOFec'
  );
  constructor() {}
  async getAllWords() {
    const { data, error } = await this.supabase.from('_dictionary').select('*');
    if (error) {
      console.log(error);
    }
    return data;
  }
  async getCategories() {
    const { data, error } = await this.supabase.from('categories').select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }
    return data;
  }
  async create(
    eng_word: any,
    rus_word: any,
    rus_gender: any,
    cat: any,
    word_level: any
  ) {
    const { data, error } = await this.supabase.from('_dictionary').insert({
      word_rus: rus_word,
      word_eng: eng_word,
      gender_rus: rus_gender,
      cat_id: cat,
      user_id: 1,
      word_level: word_level,
    });
    console.log(error);
  }

  async update(
    eng_word: any,
    rus_word: any,
    rus_gender: any,
    id: any,
    word_level: any
  ) {
    const { data, error } = await this.supabase
      .from('_dictionary')
      .update({
        word_rus: rus_word,
        word_eng: eng_word,
        gender_rus: rus_gender,
        word_level: word_level,
      })
      .eq('id', id);
  }

  async delete(id: any) {
    const { data, error } = await this.supabase
      .from('_dictionary')
      .delete()
      .eq('id', id);
  }
}
