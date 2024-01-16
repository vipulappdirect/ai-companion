import { DataSourceRefreshPeriod, DataSourceType } from "@prisma/client";
import { DataSourceDto } from "../../models/DataSources";

export interface DataSourceRepository {
  findById(id: string): Promise<DataSourceDto | null>;
  findAll(): Promise<DataSourceDto[]>;
  findByOrgId(orgId: string): Promise<DataSourceDto[]>;
  findByOrgIdAndUserId(orgId: string, userId: string): Promise<DataSourceDto[]>;
  findByAiId(aiId: string): Promise<DataSourceDto[]>;
  findDataSourceIdsToRefresh(now: Date): Promise<string[]>;

  initializeDataSource(
    orgId: string,
    ownerUserId: string,
    name: string,
    type: DataSourceType,
    refreshPeriod: DataSourceRefreshPeriod,
    data: any
  ): Promise<DataSourceDto>;

  updateDataSource(dataSourceDto: DataSourceDto): Promise<DataSourceDto>;
}
