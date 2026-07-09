import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

async function testConnection() {
    const { data, error } = await supabase
        .from("items")
        .select("*");

    console.log("data:", data);
    console.log("error:", error);
}

testConnection();