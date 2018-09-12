/**
 * Call the next reducer function until the previous reducer function resolves.
 * @param  {[function]} reducers - Reducer functions will be called by order.
 * @param  {...[any]}   [others] - Parameters to be consumed by each reducer function.
 * @return {any}
 */
export default async function sequentialReduce(reducers, ...others) {
  return reducers.reduce(async (previousPromise, reducer) => {
    const previousResult = await previousPromise;
    const result = await reducer(...others, previousResult);
    return result;
  }, void 0);
}
