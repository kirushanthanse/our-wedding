import dynamic from 'next/dynamic'

const DynamicWishes = dynamic(()=>import('./wishes'),{
  ssr:false,
  loading:()=><p></p>
});
function page() {
  return (
    <DynamicWishes />
  )
}

export default page