import { DataSourceDto } from "@/src/domain/models/DataSources";
import { DataSourceRepository } from "@/src/domain/ports/outgoing/DataSourceRepository";
import prismadb from "@/src/lib/prismadb";
import {
  DataSource,
  DataSourceIndexStatus,
  DataSourceRefreshPeriod,
  DataSourceType,
  Prisma,
} from "@prisma/client";

const dataSourceSummarySelect: Prisma.DataSourceSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  lastIndexedAt: true,
  name: true,
  type: true,
  orgId: true,
  ownerUserId: true,
  indexStatus: true,
  indexPercentage: true,
};

export class DataSourceRepositoryImpl implements DataSourceRepository {
  public async findById(id: string): Promise<DataSourceDto | null> {
    const dataSource = await prismadb.dataSource.findUnique({
      where: { id },
    });

    if (!dataSource) {
      return null;
    }

    return this.mapDataSourceToDto(dataSource);
  }

  public async findAll(): Promise<DataSourceDto[]> {
    const dataSources = await prismadb.dataSource.findMany({
      select: dataSourceSummarySelect,
    });
    return this.mapDataSourcesToDto(dataSources);
  }
  public async findByOrgId(orgId: string): Promise<DataSourceDto[]> {
    const dataSources = await prismadb.dataSource.findMany({
      select: dataSourceSummarySelect,
      where: {
        orgId,
      },
    });
    return this.mapDataSourcesToDto(dataSources);
  }
  public async findByOrgIdAndUserId(
    orgId: string,
    userId: string
  ): Promise<DataSourceDto[]> {
    const dataSources = await prismadb.dataSource.findMany({
      select: dataSourceSummarySelect,
      where: {
        orgId,
        ownerUserId: userId,
      },
    });
    return this.mapDataSourcesToDto(dataSources);
  }

  public async findByAiId(aiId: string): Promise<DataSourceDto[]> {
    const dataSources = await prismadb.dataSource.findMany({
      select: dataSourceSummarySelect,
      where: {
        ais: {
          some: {
            aiId,
          },
        },
      },
    });
    return this.mapDataSourcesToDto(dataSources);
  }

  private mapDataSourcesToDto(dataSources: DataSource[]): DataSourceDto[] {
    return dataSources.map((dataSource) => this.mapDataSourceToDto(dataSource));
  }

  private mapDataSourceToDto(dataSource: DataSource): DataSourceDto {
    return {
      ...dataSource,
      indexPercentage: dataSource.indexPercentage.toString(),
    };
  }

  public async initializeDataSource(
    orgId: string,
    ownerUserId: string,
    name: string,
    type: DataSourceType,
    refreshPeriod: DataSourceRefreshPeriod,
    data: any
  ): Promise<DataSourceDto> {
    const dataSource = await prismadb.dataSource.create({
      data: {
        orgId,
        ownerUserId,
        name,
        type,
        refreshPeriod,
        indexStatus: DataSourceIndexStatus.INITIALIZED,
        indexPercentage: 0,
        data,
      },
    });
    return this.mapDataSourceToDto(dataSource);
  }

  public async updateDataSource(
    dataSourceDto: DataSourceDto
  ): Promise<DataSourceDto> {
    const dataSource = await prismadb.dataSource.update({
      where: {
        id: dataSourceDto.id,
      },
      data: {
        ...dataSourceDto,
      },
    });
    return this.mapDataSourceToDto(dataSource);
  }
}
