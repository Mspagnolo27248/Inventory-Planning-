export type GenericWithInternalIdField<T extends Record<string, any>> = T & {
    internalId: string;
  }; 