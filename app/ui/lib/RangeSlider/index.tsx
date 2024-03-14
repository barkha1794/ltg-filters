import type { CSSProperties, ChangeEvent, ReactNode } from "react";
import { forwardRef, useImperativeHandle, useState } from "react";

export type RangeSliderProps = {
  minLimit: number;
  maxLimit: number;
  showLimits?: boolean;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  minGap?: number;
  step?: number;
  renderValue?: (value: number) => ReactNode;
  namePrefix?: string;
  onValueChange?: (props: { min: number; max: number }) => void;
  disabled?: boolean;
};

export type RangeSliderRefType = {
  value: { min: number; max: number };
  handleReset: () => void;
};

export const RangeSlider = forwardRef<RangeSliderRefType, RangeSliderProps>(
  (
    {
      defaultMinValue,
      defaultMaxValue,
      minLimit,
      maxLimit,
      showLimits = false,
      minGap = 0,
      step = 1,
      renderValue = (value) => value,
      namePrefix = "",
      onValueChange = () => {},
      disabled = false,
    },
    ref
  ) => {
    const [isMinActive, setMinActive] = useState<boolean>(true);
    const [minValue, setMinValue] = useState<number>(
      defaultMinValue || minLimit
    );
    const [maxValue, setMaxValue] = useState<number>(
      defaultMaxValue || maxLimit
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          value: { min: minValue, max: maxValue },
          handleReset: () => {
            setMinValue(defaultMinValue || minLimit);
            setMaxValue(defaultMaxValue || maxLimit);
          },
        };
      },
      [defaultMaxValue, maxLimit, maxValue, defaultMinValue, minLimit, minValue]
    );

    const offset = minLimit;
    const total = maxLimit - minLimit;

    const left = ((minValue - offset) / total) * 100;
    const right = ((maxValue - offset) / total) * 100;

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
      const currentMin = parseInt(e.target.value);
      const gap = maxValue - currentMin;
      const newMin = gap <= minGap ? maxValue - minGap : currentMin;
      setMinValue(newMin);
      setMinActive(true);
      onValueChange({ min: newMin, max: maxValue });
    };

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
      const currentMax = parseInt(e.target.value);
      const gap = currentMax - minValue;
      const newMax = gap <= minGap ? minValue + minGap : currentMax;
      setMaxValue(newMax);
      setMinActive(false);
      onValueChange({ min: minValue, max: newMax });
    };
    return (
      <div className="slider-wrapper">
        <div className="range-slider">
          <input
            type="range"
            name={`${namePrefix}min`}
            min={minLimit}
            max={maxLimit}
            step={step}
            value={minValue}
            onChange={handleMinChange}
            disabled={disabled}
          />
          <input
            type="range"
            name={`${namePrefix}max`}
            min={minLimit}
            max={maxLimit}
            step={step}
            value={maxValue}
            onChange={handleMaxChange}
            disabled={disabled}
          />
          <span
            className="slider-track"
            style={
              {
                "--left": left,
                "--right": right,
              } as CSSProperties
            }
          ></span>
          {showLimits && (
            <>
              <div className="tooltip min-tooltip" style={{ left: 0 }}>
                {renderValue(minLimit)}
              </div>
              <div className="tooltip max-tooltip" style={{ right: 0 }}>
                {renderValue(maxLimit)}
              </div>
            </>
          )}

          <div
            className="tooltip min-tooltip"
            style={{ left: `${left}%`, zIndex: isMinActive ? 5 : 0 }}
          >
            {renderValue(minValue)}
          </div>
          <div
            className="tooltip max-tooltip"
            style={{ right: `${100 - right}%`, zIndex: isMinActive ? 0 : 5 }}
          >
            {renderValue(maxValue)}
          </div>
        </div>
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";
