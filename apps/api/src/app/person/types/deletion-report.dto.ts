import { ApiProperty } from '@nestjs/swagger';
import { DeletionReport } from '@peepz/api-interfaces';

export class DeletionReportDto implements DeletionReport {
  @ApiProperty({ example: 1, required: false })
  ok?: number;
  @ApiProperty({ example: 0, required: false })
  n?: number;
  @ApiProperty({ example: 1, required: false })
  deletedCount?: number;
}
