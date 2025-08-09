import type { FundingSource } from "../../infraestructure/database/db";
import { Chip, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

import { Calendar, Ellipsis, TrendingUp, Wallet } from "lucide-react";
import { updateActiveStatus } from "../../services/fouding-sources.service";


function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate({ dateString, withTime = false }: { dateString: string | null, withTime?: boolean }): string {
  if (!dateString) return 'No disponible';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-GT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(withTime && { hour: '2-digit', minute: '2-digit' }),
  }).format(date);
}

const FundingSourcesOptionsButton = ({ children }: { children: (handleClose: () => void) => React.ReactNode; }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
      >
        <div>
          <Ellipsis size={18} />
        </div>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {children(handleClose)}
      </Menu>
    </div>
  );
}

export const FundingSourceCard = ({ fundingSource, removeFundingSource, onEdit }: {
  fundingSource: FundingSource,
  removeFundingSource: (id: number) => void,
  onEdit: (fs: FundingSource) => void
}) => {
  const { createdAt, updatedAt, name, description, id, isActive, currency, amount } = fundingSource;

  return (
    <div className="max-w-[480px] w-full bg-white p-4 border-gray-100 border-2 rounded flex flex-col justify-between text-gray-600">

      {/* Header */}
      <div className="flex justify-between items-center text-gray-900">

        {/* Icon + Name */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Wallet className="h-4 w-4 text-gray-700" />
          </div>
          <div>
            <div className="text-lg font-semibold">{name}</div>
          </div>
        </div>

        {/* Active indicator + Options  */}
        <div className="flex items-center gap-4">
          <Chip
            size="small" color={isActive ? "success" : "default"}
            label={isActive ? "Active" : "Inactive"}
            variant={isActive ? "filled" : "outlined"}
          />
          <FundingSourcesOptionsButton>
            {(handleClose) => (
              <>
                <MenuItem onClick={() => { onEdit(fundingSource); handleClose() }}>
                  <span>Edit</span>
                </MenuItem>
                <MenuItem onClick={() => { updateActiveStatus(id, !isActive); handleClose() }}>
                  <span>Activate/Deactivate</span>
                </MenuItem>
                <MenuItem onClick={() => { removeFundingSource(id); handleClose() }}>
                  <span className="text-red-500">Delete</span>
                </MenuItem>
              </>
            )}
          </FundingSourcesOptionsButton>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">Monto disponible</span>
          </div>
          <span className="text-2xl font-bold text-green-600">
            {formatCurrency(amount, currency)}
          </span>
        </div>
      </div>

      <div className="py-4">
        <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>
      </div>

      {(createdAt || updatedAt) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-gray-100">
          {createdAt && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Creado: {formatDate({ dateString: createdAt })}</span>
            </div>
          )}
          {updatedAt && (
            <div className="flex items-center space-x-1">
              <span>Actualizado: {formatDate({ dateString: updatedAt, withTime: true })}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
