import { createClient } from "@supabase/supabase-js";

const URL = "https://rujcddnjmanrjibvanbu.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1amNkZG5qbWFucmppYnZhbmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNzc3OTEsImV4cCI6MjA3MTY1Mzc5MX0.3rSNA2WR7piCYwlFEI-zQ4wBrg8IAa_nbnn3rSYiWUg";

export const supabase = createClient(URL, API_KEY);
