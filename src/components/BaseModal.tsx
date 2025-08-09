export default function BaseModal({ children }: { children: JSX.Element }) {
  return (
    <div className="flex h-full w-full overflow-auto hover:cursor-default">
      <div
        onClick={(e) => e.stopPropagation()}
        className="4xl:w-[1100px] m-auto h-4/6 w-[850px] min-w-[236px] max-w-[95%] rounded-md bg-slate-900 px-8 py-5"
      >
        {children}
      </div>
    </div>
  );
}
