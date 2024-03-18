import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://cclfrpytgrktlevygbqp.supabase.co';

const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbGZycHl0Z3JrdGxldnlnYnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0Mjg1MDQsImV4cCI6MjAwNzAwNDUwNH0.700tg45bvAe3GR4s8H3LMInpeJ7-8DWcpCN7JTDLSU0';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
