export declare class CodeGenerationConfigDto {
    codePrefix: string;
    codeWidth: number;
    allowDuplicate: boolean;
    resetPeriod: string;
}
export declare class GenerateCodeResponseDto {
    receptionCode: string;
    sampleTypeCode: string;
    date: string;
    nextSequence: number;
    codeGenerationConfig: CodeGenerationConfigDto;
}
