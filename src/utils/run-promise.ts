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

type Result<Data, E = Error> = Success<Data> | Failure<E>;
type Success<Data> = [data: Data, error: null];
type Failure<E> = [data: null, error: E];
