import { DefaultNamingStrategy } from 'typeorm';
export declare class OracleNamingStrategy extends DefaultNamingStrategy {
    tableName(className: string, customName?: string): string;
    columnName(propertyName: string, customName?: string): string;
    indexName(tableOrName: string, columns: string[], where?: string): string;
    primaryKeyName(tableOrName: string, columnNames: string[]): string;
    uniqueConstraintName(tableOrName: string, columnNames: string[]): string;
    foreignKeyName(tableOrName: string, columnNames: string[], referencedTablePath?: string, referencedColumnNames?: string[]): string;
    private shortenName;
}
