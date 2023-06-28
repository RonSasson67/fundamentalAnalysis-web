import { observer } from "mobx-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import TableWrapper from "../../components/TabelWrapper/TabelWrapper";
import MetricsType from "../../Entity/MetricsType";
import "./TabelWrapperPage.css";

const queryClient = new QueryClient();
interface TableWrapperPageProps {
  symbol: string;
  metricsType: MetricsType;
}

const TabelWrapperPage = observer(({ symbol, metricsType }: TableWrapperPageProps) => {
  const [stage, setStage] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="tabel-wrapper-page">
        <button className="button" onClick={() => setStage((prevStage) => prevStage + 1)}>
          change circle
        </button>
        <div className="circle" style={{ filter: `blur(${((stage * 50) % 600) + 30}px)` }} />
        <div className="content">
          <TableWrapper symbol={symbol} metricsType={metricsType} />
        </div>
      </div>
    </QueryClientProvider>
  );
});

export default TabelWrapperPage;
