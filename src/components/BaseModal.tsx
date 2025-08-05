export default function BaseModal({ children }: { children: JSX.Element }) {
  return (
    <div className="flex w-full h-full hover:cursor-default overflow-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="m-auto min-w-[236px] max-w-[95%] w-[850px] 4xl:w-[1100px] h-4/6 bg-slate-900 rounded-md flex justify-center items-center"
      >
        {children}
      </div>
    </div>
  );
}
