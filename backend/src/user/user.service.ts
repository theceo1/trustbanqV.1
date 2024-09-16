// backend/src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { supabaseInstance } from '../supabaseClient'; // Ensure you have the Supabase client imported
import { User } from '../types/user.types'; // Import the User type
import { isUser } from '../types/typeGuards'; // Import the type guard

@Injectable()
export class UserService {
  async create(createUserDto: Partial<User>): Promise<User> {
    const { data, error } = await supabaseInstance()
      .from('users')
      .insert(createUserDto)
      .single();

    if (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }

    if (!isUser(data)) {
      throw new Error('Invalid user data returned from Supabase');
    }

    return data; // Now data is guaranteed to be of type User
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabaseInstance()
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      return null; // Handle error as needed
    }

    if (!isUser(data)) {
      throw new Error('Invalid user data returned from Supabase');
    }

    return data; // Now data is guaranteed to be of type User
  }

  async findById(id: string): Promise<Partial<User>> {
    const { data, error } = await supabaseInstance()
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!isUser(data)) {
      throw new Error('Invalid user data returned from Supabase');
    }

    const { password, ...result } = data; // Assuming password is in the data
    return result; // Now result is guaranteed to be of type Partial<User>
  }
}