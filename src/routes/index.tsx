import { createFileRoute, Link } from "@tanstack/react-router";
import ninaAsset from "@/assets/nina.png.asset.json";
import ninoAsset from "@/assets/nino.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nina e Nino em: Corpo Bem Cuidado" },
      {
        name: "description",
        content: "Jogo digital de tabuleiro para 2 jogadores sobre higiene, saúde e cuidado com o ambiente.",
      },
      { property: "og:title", content: "Nina e Nino em: Corpo Bem Cuidado" },
      {
        property: "og:description",
        content: "Um jogo sobre higiene, saúde e cuidado com o ambiente.",
      },
    ],
  }),
  component: Capa,
});

function Capa() {
  return (
    <div
      className="mx-auto flex items-center justify-center bg-gradient-to-br from-sky-200 via-emerald-100 to-amber-100"
      style={{ width: 1200, height: 675 }}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* decorative icons */}
        <div className="absolute top-8 left-10 text-6xl opacity-30">🧼</div>
        <div className="absolute top-20 right-16 text-6xl opacity-30">🪥</div>
        <div className="absolute bottom-24 left-20 text-6xl opacity-30">🍎</div>
        <div className="absolute bottom-10 right-24 text-6xl opacity-30">💧</div>
        <div className="absolute top-1/2 left-6 text-5xl opacity-25">🗑️</div>
        <div className="absolute top-1/3 right-8 text-5xl opacity-25">🧴</div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <img src={ninaAsset.url} alt="Nina" className="absolute left-20 bottom-12 h-72 drop-shadow-xl" />
          <img src={ninoAsset.url} alt="Nino" className="absolute right-20 bottom-12 h-72 drop-shadow-xl" />

          <h1 className="text-5xl md:text-6xl font-black text-emerald-800 drop-shadow-sm">Nina e Nino em:</h1>
          <h2 className="mt-2 text-4xl md:text-5xl font-black text-orange-600 drop-shadow-sm">Corpo Bem Cuidado</h2>
          <p className="mt-4 text-lg text-slate-700 font-medium max-w-xl">
            Um jogo sobre higiene, saúde e cuidado com o ambiente.
          </p>
          <p className="mt-3 text-base text-slate-600 max-w-md">
            Hoje é dia de descobertas! Ajude Nina e Nino a encontrar cuidados que protegem a saúde.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/jogar"
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-3.5 text-lg shadow-xl shadow-emerald-600/30 transition hover:scale-105"
            >
              Jogar
            </Link>
            <Link
              to="/como-jogar"
              className="rounded-full bg-white hover:bg-slate-50 border-4 border-slate-700 text-slate-800 font-bold px-8 py-3 text-lg shadow-xl"
            >
              Como jogar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
