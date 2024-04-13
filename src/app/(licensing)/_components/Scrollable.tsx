import { Children } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}
function Container({ children, className }: Props) {
  return (
    <div className={twMerge("flex h-full flex-col overflow-hidden", className)}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: ({ children }: Props) => {
    let error: Error | null = new Error("Content hasn't been defined.");
    Children.forEach(children, function (child) {
      if (child.type === Content) {
        error = null;
      }
    });
    return error;
  },
};
function Content({ children }: React.PropsWithChildren) {
  return <div className="overflow-auto">{children}</div>;
}

export { Container, Content };
