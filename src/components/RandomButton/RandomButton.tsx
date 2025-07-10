import { useEffect } from 'react';
import { State, EventHandler } from 'zvm-code-context';
import cssModule from './style.module.scss';

export interface RandomButtonPropData {
  min: number;
  max: number;
}

export interface RandomButtonStateData {
  result?: State<number>;
}
export interface RandomButtonEvent {
  onChange?: EventHandler;
}

export interface RandomButtonProps {
  propData: RandomButtonPropData;
  propState: RandomButtonStateData;
  event: RandomButtonEvent;
}

function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function RandomButton({
  propData,
  propState,
  event,
}: RandomButtonProps) {
  const { min, max } = propData;
  const { result } = propState;

  useEffect(() => {
    event.onChange?.();
  }, [result?.get()]);

  return (
    <div
      className={cssModule.btn}
      onClick={() => result?.set(getRandomNumber(min, max))}
    >
      Click
    </div>
  );
}
