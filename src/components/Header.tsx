import classNames from "classnames";

export function Header({
  children,
  icon,
  className,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={classNames("flex flex-row items-center gap-4 mb-4", className)}
    >
      {children && icon ? (
        <span className="bg-[#D1E9FF] text-blue-500 rounded-full inline-block p-2">
          {icon}
        </span>
      ) : undefined}
      {children && (
        <h1 className="text-2xl font-bold text-blue-500">{children}</h1>
      )}
    </header>
  );
}
