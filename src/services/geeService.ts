/**
 * GEE Service Simulator
 * 模拟 Google Earth Engine 的数据交互逻辑
 */

export interface GEETask {
    id: string;
    name: string;
    status: 'running' | 'completed' | 'failed';
    progress: number;
    startTime: string;
}

export const geeService = {
    /**
     * 调用后端 GEE 处理流程
     * @param params 处理参数
     */
    async computeIndices(params: { collection?: string; dateRange: [string, string]; index: string }) {
        console.log(`Requesting real GEE processing for ${params.index}...`);
        
        try {
            const response = await fetch('/api/gee/process-lake', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    index: params.index,
                    startDate: params.dateRange[0],
                    endDate: params.dateRange[1],
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'GEE API 调用失败');
            }

            const data = await response.json();
            
            return {
                imageUrl: data.tileUrlTemplate,
                stats: {
                    mean: data.stats[params.index] || 0,
                    area: '通过 GEE 精确计算',
                    raw: data.stats
                },
                mapId: data.mapId
            };
        } catch (error) {
            console.error("GEE Service Error:", error);
            throw error;
        }
    },

    async startExportTask(name: string): Promise<GEETask> {
        // 实际开发中可对接后端任务导出接口
        return {
            id: `gee-task-${Date.now()}`,
            name,
            status: 'running',
            progress: 5,
            startTime: new Date().toISOString()
        };
    }
};
