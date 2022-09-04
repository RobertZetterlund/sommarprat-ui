export const ErrorBox = ({
  text,
  code = 400,
}: {
  text: string;
  code?: number;
}) => {
  return (
    <div className="m-auto flex h-full flex-col self-center text-slate-100">
      <div className="pb-4 text-center text-9xl">?</div>
      <h1 className="text-2xl">Error {code}</h1>
      {text}
    </div>
  );
};
