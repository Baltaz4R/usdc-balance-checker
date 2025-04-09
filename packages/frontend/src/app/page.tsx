import Balance from "./_components/Balance";

export default function Index() {
  return (
    <main className="bg-muted flex min-h-screen items-start justify-center">
      <div className="mt-[20vh] w-full max-w-lg rounded-2xl border bg-white px-8 py-8 shadow-xl">
        <div className="mb-4 flex items-center">
          <img
            src="/favicon.ico"
            className="mr-2.5 h-10 w-10"
          />
          <h1 className="text-xl font-bold">
            Check USDC Balance:
          </h1>
        </div>
        <Balance />
      </div>
    </main>
  );
}
