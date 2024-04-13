import { type UseFormReturn } from "react-hook-form";

export function submitMultipe<T extends Record<string, unknown>[]>(
  ...forms: {
    [I in keyof T]: UseFormReturn<T[I]>;
  }
) {
  return (
    onSuccess: (data: [...T]) => void,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onError: () => void = () => {},
  ) => {
    return async (event?: React.SyntheticEvent) => {
      event?.preventDefault();
      event?.persist();

      try {
        const result = await Promise.all(
          forms.map(
            (form) =>
              new Promise((resolve, reject) => {
                form
                  .handleSubmit(resolve, reject)()
                  .catch((error) => {
                    console.error(error);
                  });
              }),
          ),
        );

        onSuccess(result as [...T]);
      } catch {
        console.log(event);
        onError();
      }
    };
  };
}
