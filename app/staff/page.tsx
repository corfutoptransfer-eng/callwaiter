'use client';
import {useEffect,useState} from 'react';
import {createClient} from '@supabase/supabase-js';
type RequestRow={id:string;table_number:number;type:string;status:string;created_at:string};
const labels:Record<string,string>={CALL_WAITER:'Call Waiter',ORDER:'Order',BILL:'Bill',OTHER:'Other Request'};
export default function Staff(){
  const [rows,setRows]=useState<RequestRow[]>([]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://urdvmjdyuuokbcdifcvl.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_oifMK8eFpKveFVj6rX9wag_Zxplwoa7';
  const supabase = createClient(supabaseUrl, supabaseKey);
}
