import { useEffect } from "react";
import { FS_UI_STATES, useFundingSourceStore } from "../../stores/funding-source-ui.store";
import type { FundingSource } from "../../infraestructure/database/db";


type FundingSourceUIStateProps = {
  children: (helpers: {
    selectFundingSource: (fs: FundingSource) => void;
    deselectFundingSource: () => void;
    isListing: () => boolean;
    isSelecting: () => boolean;
  }) => React.ReactNode;
};

export default function FundingSourceUIState({ children }: FundingSourceUIStateProps) {
  const setFundingSource = useFundingSourceStore.use.setSelectedFundingSource();
  const uiState = useFundingSourceStore.use.uiState();
  const setUiState = useFundingSourceStore.use.setUIState();
  const setSelectedFundingSource = useFundingSourceStore.use.setSelectedFundingSource();

  const selectFundingSource = (fs: FundingSource) => {
    setUiState(FS_UI_STATES.SELECTING);
    setFundingSource(fs);
  };

  const deselectFundingSource = () => {
    setUiState(FS_UI_STATES.LISTING);
    setSelectedFundingSource(null);
  };

  const isListing = () => uiState === FS_UI_STATES.LISTING;
  const isSelecting = () => uiState === FS_UI_STATES.SELECTING;

  useEffect(() => {
    setUiState(FS_UI_STATES.LISTING);
  }, []);

  useEffect(() => {
    if (uiState !== FS_UI_STATES.SELECTING) {
      setSelectedFundingSource(null);
    }
  }, [uiState]);

  return children({
    selectFundingSource,
    deselectFundingSource,
    isListing,
    isSelecting,
  });
}
