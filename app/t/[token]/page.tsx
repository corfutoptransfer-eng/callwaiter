import CustomerClient from './CustomerClient';
export default async function CustomerPage({params}:{params:Promise<{token:string}>}){
  const {token}=await params;
  return <CustomerClient token={token}/>;
}
