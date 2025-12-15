export async function runPromise<Data, E = Error>(
  promise: Promise<Data>,
): Promise<Result<Data, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}

type Result<Data, E = Error> = [data: Data, error: null] | Failure<E>;
type Failure<E> = [data: null, error: E];
