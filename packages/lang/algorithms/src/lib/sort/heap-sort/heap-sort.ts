let count = 0;

// const buildHeap = (items: any[]) => {
//   for (let i = (items.length/2 - 1); i >= 0; i--) {
//     heapify(items, i, items.length);
//   }
// }

// /**
//  * Heap Sort O(n log n) Linearithmic
//  */

// export const heapSort = (items: any[]) => {
//   buildHeap(items);
//   for (let i = items.length - 1; i >= 1; i--) {
//     const tmp = items[0];
//     items[0] = items[i];
//     items[i] = tmp;
//     console.log('heapSort swapping', items[0], items[1]);
//     count++;
//   }
//   console.log('count', count);
// };

// const heapify = (ar: any[], idx: number, max: number) => {
//   // const left = 2 * idx + 1;
//   // const right = 2 * idx + 2;
//   // let largest = idx;
//   // // Find largest element of A[idx], A[left], and A[right]
//   // if (left < max && items[left] > items[largest]) {
//   //   largest = left;
//   // }

//   // if (right < max && items[right] > items[largest]) {
//   //   largest = right;
//   // }

//   // // If largest is not already the parent then swap and propagate.
//   // if (largest !== idx) {
//   //   const tmp = items[idx];
//   //   items[idx] = items[largest];
//   //   items[largest] = tmp;
//   //   console.log('heapify swapping', items[idx], items[largest]);
//   //   count++;

//   //   heapify(items, largest, max);
//   // }

//   const left = 2*idx + 1;
//   const right = 2*idx + 2;
//   let largest;
//   console.log('heapify idx, left, right', idx, left, right);

//   /* Find largest element of A[idx], A[left], and A[right]. */
//   if (left < max && ar[left] > ar[idx]) {
//     largest = left;
//   } else {
//     largest = idx;
//   }

//   if (right < max && ar[right] > ar[largest]) {
//     largest = right;
//   }

//   /* If largest is not already the parent then swap and propagate. */
//   if (largest != idx) {
//      const tmp = ar[idx];
//      ar[idx] = ar[largest];
//      ar[largest] = tmp;
//       // console.log('swap', ar[idx], ar[largest]);
//       // console.log(ar);
//      heapify(ar,largest, max);
//    }
// }

// const buildHeap = (ar: any[]) => {
//   const n = ar.length;
//   const mid = n/2-1;
//   console.log('mid', mid);
//   for (let i = mid; i >= 0; i--) {
//     heapify (ar, i - 1, n - 1); // i -1, n -1 works for 6 element array
//     console.log('buildHeap - heapified', ar);
//   }
// }

// export const heapSort = (ar: any[]) => {
//   console.log('SORT', ar);
//   buildHeap (ar);
//   const n = ar.length;
//   for (let i = n-1; i >= 1; i--) {
//     const tmp = ar[0];
//     ar[0] = ar[i];
//     ar[i] = tmp;
//     heapify (ar, 0, i);
//     console.log('heapSort heapified', ar);
//   }
//   console.log('COMPLETE', ar);
// }

const heapify = (arr: any[], n: number, i: number) => {
    let largest = i; // Initialize largest as root
    const l = 2 * i + 1; // left = 2*i + 1
    const r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n && arr[l] > arr[largest]) {
      largest = l;
    }

    // If right child is larger than largest so far
    if (r < n && arr[r] > arr[largest]) {
      largest = r;
    }

    // If largest is not root
    if (largest != i) {
      const swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;

      // Recursively heapify the affected sub-tree
      heapify(arr, n, largest);
    }
}

const buildHeap = (arr: any[]) => {
    const n = arr.length;
    // Build heap (rearrange array)
    const mid = (n - 1)/2;
    for (let i = Math.floor(mid); i >= 0; i--) {
      heapify(arr, n, i);
    }
}

export const heapSort = (ar: any[]) => {
  console.log('SORT', ar);
  buildHeap (ar);
  const n = ar.length;
  for (let i = n - 1; i >= 1; i--) {
    const tmp = ar[0];
    ar[0] = ar[i];
    ar[i] = tmp;
    heapify (ar, 0, i);
    console.log('heapSort heapified', ar);
  }
  console.log('COMPLETE', ar);
}
