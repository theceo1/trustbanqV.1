// backend/src/user/user.service.ts
import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common'; // Import BadRequestException
import { getSupabaseClient } from '../supabaseClient'; // Update the import
import { User } from '../types/user.types'; // Import the User type
import { isUser } from '../types/typeGuards'; // Import the type guard

@Injectable()
export class UserService {
  async create(createUserDto: Partial<User>): Promise<User> {
    // Check if email is provided
    if (!createUserDto.email) {
      throw new BadRequestException('Email is required'); // Throw error if email is not provided
    }

    // Check if the user already exists
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists'); // Throw conflict error if email exists
    }

    // Prepare the data to insert, including created_at
    const userData = {
      ...createUserDto,
      created_at: new Date().toISOString(), // Set created_at to the current timestamp
    };

    console.log('Creating user with data:', userData); // Log the data being sent

    const { data, error } = await getSupabaseClient() // Use getSupabaseClient
      .from('users')
      .insert(userData)
      .single();

    console.log('Supabase response data:', data); // Log the response data

    if (error) {
      console.error('Supabase error:', error); // Log the error
      throw new Error(`Error creating user: ${error.message}`);
    }

    if (!isUser(data)) {
      throw new Error('Invalid user data returned from Supabase');
    }

    return data; // Now data is guaranteed to be of type User
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await getSupabaseClient() // Use getSupabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Supabase error:', error); // Log the error
      return null; // Handle error as needed
    }

    if (!isUser(data)) {
      throw new Error('Invalid user data returned from Supabase');
    }

    return data; // Now data is guaranteed to be of type User
  }

  async findById(id: string): Promise<Partial<User>> {
    const { data, error } = await getSupabaseClient() // Use getSupabaseClient
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Supabase error:', error); // Log the error
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!isUser(data)) {
      throw new Error('Invalid user data returned from Supabase');
    }

    const { password, ...result } = data; // Assuming password is in the data
    return result; // Now result is guaranteed to be of type Partial<User>
  }
}