
import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

interface PassengerCounterProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  hideArrows?: boolean;
}

const PassengerCounter = ({
  value,
  onChange,
  className = '',
  hideArrows = false
}: PassengerCounterProps) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Validate and update parent
    const num = parseInt(newValue);
    if (num >= 1 && num <= 20) {
      onChange(num);
    }
  };

  const increment = () => {
    const num = parseInt(inputValue);
    if (num < 20) {
      const newValue = num + 1;
      setInputValue(newValue.toString());
      onChange(newValue);
    }
  };

  const decrement = () => {
    const num = parseInt(inputValue);
    if (num > 1) {
      const newValue = num - 1;
      setInputValue(newValue.toString());
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    const num = parseInt(inputValue);
    if (isNaN(num) || num < 1 || num > 20) {
      setInputValue(value.toString());
    }
  };

  if (hideArrows) {
    return (
      <div className={`flex items-center rounded-xl border border-input bg-white overflow-hidden ${className}`}>
        <input
          type="number"
          min="1"
          max="20"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-full h-full text-center bg-white text-[hsl(222.2,84%,4.9%)] border-0 focus:ring-0 focus:outline-none"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center rounded-xl border border-input bg-white overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={decrement}
        disabled={parseInt(inputValue) <= 1}
        className="w-10 h-full bg-white hover:bg-gray-50 text-[hsl(222.2,84%,4.9%)] border-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
      >
        <Minus className="h-4 w-4" />
      </button>
      
      <input
        type="number"
        min="1"
        max="20"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="flex-1 h-full text-center bg-white text-[hsl(222.2,84%,4.9%)] border-0 focus:ring-0 focus:outline-none"
      />
      
      <button
        type="button"
        onClick={increment}
        disabled={parseInt(inputValue) >= 20}
        className="w-10 h-full bg-white hover:bg-gray-50 text-[hsl(222.2,84%,4.9%)] border-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PassengerCounter;
