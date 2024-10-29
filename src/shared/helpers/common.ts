import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';

import { ApplicationError, ValidationErrorField } from '../libs/rest/index.js';
import {RangeType} from '../types/range.types.js';

export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomBoolean(): boolean {
  return Boolean(Math.round(Math.random()));
}

export function getRandomInRange(range: RangeType, numAfterDigit = 0) {
  return generateRandomValue(range.Min, range.Max, numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomDate(): Date {
  const startDate = new Date('2022-01-01T00:00:00.000Z');
  const endDate = new Date('2030-12-31T23:59:59.999Z');
  const randomTimestamp = Math.floor(Math.random() * (endDate.getTime() - startDate.getTime())) + startDate.getTime();
  return new Date(randomTimestamp);
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

