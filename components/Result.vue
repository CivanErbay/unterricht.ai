<template>
  <div
    id="result-table"
    class="overflow-x-auto relative shadow-md sm:rounded-lg w-3/4"
  >
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6">Title</th>
          <th scope="col" class="py-3 px-6">Duration</th>
          <th scope="col" class="py-3 px-6">Content</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ item.title }}
          </th>
          <td class="py-4 px-6">
            {{ item.duration }}
          </td>
          <td class="py-4 px-6">
            {{ item.content }}
          </td>
        </tr>
      </tbody>
    </table>
    <button
      @click="generatePDF"
      class="border-2 bg-white text-black border-black hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-bold mt-6"
    >
      Als pdf speichern
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { jsPDF } from 'jspdf';

const props = defineProps({
  items: Array,
});


// Function to generate the PDF
function generatePDF() {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 10; // Set margin for the page
  const maxLineWidth = pageWidth - margin * 2; // Calculate maximum line width for text
  const lineHeight = 10; // Define line height for spacing between lines
  let yPos = 20; // Initial Y position for the first line of text after the title

  // Add a title to the PDF
  pdf.setFontSize(16); // Set title font size
  pdf.text("Results", margin, 10);

  pdf.setFontSize(12); // Reset font size for the body text

  // Iterate through each item and add it to the PDF
  props.items.forEach((item, index) => {
    // Use splitTextToSize to handle text wrapping
    let text = `${item.title} - ${item.duration} - ${item.content}`;
    let lines = pdf.splitTextToSize(text, maxLineWidth);

    // Check if adding the current text would exceed the page height, add a new page if needed
    if (yPos + lines.length * lineHeight > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage();
      yPos = 20; // Reset Y position for the new page
    }

    // Add the text to the PDF
    pdf.text(lines, margin, yPos);

    // Update yPos for the next item, adding space for the number of lines just added
    yPos += lines.length * lineHeight;
  });

  // Save the PDF
  pdf.save('results.pdf');
}
</script>
<style scoped></style>
