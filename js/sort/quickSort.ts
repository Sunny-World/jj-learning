
class QuickSort{
    constructor(){}
    // 交换
    private swap(arr:array, a:number, b:number) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
    // 快速排序（in-place）
    private quickSort(arr:array){
        if(arr.length<=1){
            return;
        }
    }
    // 分区
    private partition(arr:array, left:number, right:number) {
        /**
         * 开始时不知最终pivot的存放位置，可以先将pivot交换到后面去
         * 这里直接定义最右边的元素为基准
         */
        let pivot = arr[right];
        /**
         * 存放小于pivot的元素时，是紧挨着上一元素的，否则空隙里存放的可能是大于pivot的元素，
         * 故声明一个storeIndex变量，并初始化为left来依次紧挨着存放小于pivot的元素。
         */
        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (arr[i] < pivot) {
                /**
                 * 遍历数组，找到小于的pivot的元素，（大于pivot的元素会跳过）
                 * 将循环i次时得到的元素，通过swap交换放到storeIndex处，
                 * 并对storeIndex递增1，表示下一个可能要交换的位置
                 */
                this.swap(arr, storeIndex, i);
                storeIndex++;
            }
        }
        // 最后： 将pivot交换到storeIndex处，基准元素放置到最终正确位置上
        this.swap(arr, right, storeIndex);
        return storeIndex;
    }
    private sort(arr:array, left:number, right:number) {
        if (left > right) return;

        let storeIndex = this.partition(arr, left, right);
        this.sort(arr, left, storeIndex - 1);
        this.sort(arr, storeIndex + 1, right);
    }
    public run(arr:array){
        this.sort(arr, 0, arr.length - 1);
        return arr;
    }
}
export default QuickSort; 