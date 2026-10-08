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

  useEffect(() => {
    const fetchRequests = async () => {
      const { data } = await supabase.from('requests').select('*').order('created_at', { ascending: false });
      if (data) setRows(data);
    };

    fetchRequests();

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'requests' }, (payload) => {
        setRows((prev) => [payload.new as RequestRow, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Staff Dashboard</h1>
      {rows.length === 0 ? (
        <p>Δεν υπάρχουν ενεργές κλήσεις.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rows.map((row) => (
            <li key={row.id} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
              <strong>Τραπέζι {row.table_number}:</strong> {labels[row.type] || row.type} - <em>{row.status}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

