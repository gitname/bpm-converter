import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App', function () {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
  });

});

describe('calculateBeatDuration', function () {

  it('handles a positive integer as input', () => {
    expect(App.calculateBeatDuration(120)).toBe(500);
  });

  it('handles a negative integer as input', () => {
    expect(App.calculateBeatDuration(-60)).toBe(-1000);
  });

  it('handles 0 as input', () => {
    expect(App.calculateBeatDuration(0)).toBe(Infinity);
  });

  it('handles Infinity as input', () => {
    expect(App.calculateBeatDuration(Infinity)).toBe(0);
  });

  it('handles a positive floating-point number as input', () => {
    expect(App.calculateBeatDuration(1.2)).toBe(50000);
  });

  it('handles a negative floating-point number as input', () => {
    expect(App.calculateBeatDuration(-0.1)).toBe(-600000);
  });

  it('can return a result that includes decimal places', () => {
    expect(App.calculateBeatDuration(50000), null).toBe(1.2);
  });

  it('can round a result to a specific number of decimal places', () => {
    expect(App.calculateBeatDuration(123, 3)).toBe(487.805); // Before rounding: 487.8048780487805
  });

});

describe('calculateTempo', function () {

  it('handles a positive integer as input', () => {
    expect(App.calculateTempo(120)).toBe(500);
  });

  it('handles a negative integer as input', () => {
    expect(App.calculateTempo(-60)).toBe(-1000);
  });

  it('handles 0 as input', () => {
    expect(App.calculateTempo(0)).toBe(Infinity);
  });

  it('handles Infinity as input', () => {
    expect(App.calculateTempo(Infinity)).toBe(0);
  });

  it('handles a positive floating-point number as input', () => {
    expect(App.calculateTempo(1.2)).toBe(50000);
  });

  it('handles a negative floating-point number as input', () => {
    expect(App.calculateTempo(-0.1)).toBe(-600000);
  });

  it('can return a result that includes decimal places', () => {
    expect(App.calculateTempo(50000), null).toBe(1.2);
  });

  it('can round a result to a specific number of decimal places', () => {
    expect(App.calculateTempo(123, 3)).toBe(487.805); // Before rounding: 487.8048780487805
  });

});