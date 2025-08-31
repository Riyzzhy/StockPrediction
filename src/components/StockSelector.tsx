import { useState } from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { availableStocks } from '../data/mockStockData';
import { cn } from '../lib/utils';

interface StockSelectorProps {
  selectedStock: string;
  onStockChange: (symbol: string) => void;
}

export function StockSelector({ selectedStock, onStockChange }: StockSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const selectedStockData = availableStocks.find(stock => stock.symbol === selectedStock);

  const filteredStocks = availableStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex items-center space-x-4 animate-slide-down">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Select Stock:</span>
      </div>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between hover-glow transition-all duration-300"
          >
            <div className="flex items-center">
              <span className="font-mono font-bold text-primary">
                {selectedStockData?.symbol || 'Select stock...'}
              </span>
              {selectedStockData && (
                <span className="ml-2 text-sm text-muted-foreground truncate">
                  {selectedStockData.name}
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 animate-slide-down">
          <Command>
            <CommandInput 
              placeholder="Search stocks..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No stocks found.</CommandEmpty>
              <CommandGroup>
                {filteredStocks.map((stock) => (
                  <CommandItem
                    key={stock.symbol}
                    value={stock.symbol}
                    onSelect={(currentValue) => {
                      onStockChange(currentValue.toUpperCase());
                      setOpen(false);
                    }}
                    className="flex items-center justify-between hover-glow transition-all duration-200"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono font-bold text-primary">
                        {stock.symbol}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {stock.name}
                      </span>
                    </div>
                    <Check
                      className={cn(
                        'ml-2 h-4 w-4',
                        selectedStock === stock.symbol ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}