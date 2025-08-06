import type { FundingSource } from "../infraestructure/database/db";
import { create } from "zustand";
import { createSelectors } from "../lib/zustand.lib";

/**
  * The UI states for the funding source management.
  * 
  * - `SELECTING`: The user is selecting a funding source,
  * this means they are choosing a funding source to build a budget from and see details about it.
  * .
  * - `VIEWING`: The user is viewing an especific funding sources.
  * 
  * - `EDITING`: The user is editing a specific funding source.
  * 
  * - `LISTING`: The user is listing all funding sources.
  * 
  * @constant
  * @type {Object}
  * @property {string} SELECTING - State when a funding source is being selected.
  * @property {string} VIEWING - State when the funding sources are being viewed.
  * @property {string} EDITING - State when a funding source is being edited.
  * @property {string} LISTING - State when the funding sources are being listed.
*/
const FS_UI_STATES = {
  SELECTING: 'selecting',
  VIEWING: 'viewing',
  EDITING: 'editing',
  LISTING: 'listing',
} as const;

type UIStates = typeof FS_UI_STATES[keyof typeof FS_UI_STATES];

type FundingSourceUIState = {
  uiState: UIStates;
  selectedFundingSource: FundingSource | null;
}

type FundingSourceActions = {
  setUIState: (state: UIStates) => void;
  setSelectedFundingSource: (fs: FundingSource | null) => void;
}

const fundingSourceStoreBase = create<FundingSourceUIState & FundingSourceActions>((set) => ({
  uiState: FS_UI_STATES.VIEWING,
  selectedFundingSource: null,
  setSelectedFundingSource: (fs: FundingSource | null) => set({ selectedFundingSource: fs }),
  setUIState: (uiState: UIStates) => set({ uiState })
}))

const useFundingSourceStore = createSelectors(fundingSourceStoreBase)

export type { FundingSourceUIState, FundingSourceActions, UIStates };
export { FS_UI_STATES, useFundingSourceStore };
