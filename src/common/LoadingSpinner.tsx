/** Loading Spinner
 *
 * (App, CompaniesList, JobsList) -> LoadingSpinner
 */

// BUG: background changes color

function LoadingSpinner() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-base-300">
      <div
        className="animate-spin w-24 h-24 border-l-4 border-r-4 border-b-4 rounded-full border-accent"
        role="status"
      ></div>
    </div>
  );
}
export default LoadingSpinner;
