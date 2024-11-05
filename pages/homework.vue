<script setup lang="ts">
let homework = ref(
  {
    lesson: 'Машиное обучение',
    name: 'Вася Пупкин',
    date: new Date().toDateString(),
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut leo eget ante sollicitudin sodales congue ut sapien. Nulla non ornare felis. Morbi in felis lectus. Sed ut molestie purus. Mauris quam arcu, faucibus eget erat interdum, mattis molestie sapien. Sed quis lacus ut libero rhoncus consequat vitae eu libero. Nullam semper orci eros, placerat pharetra massa commodo eu. Fusce pretium pretium urna, vel semper justo placerat laoreet. Fusce consectetur magna eu sagittis semper. Aenean eget mi euismod, commodo turpis a, lacinia elit. Etiam in augue elit. Vivamus consequat dignissim dui at consequat. Aliquam lobortis at sem quis suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Duis condimentum sem vulputate turpis aliquam, eget vehicula felis mattis. Ut elit eros, laoreet accumsan justo in, rutrum fringilla nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam vitae commodo ipsum, sed pellentesque arcu. Donec a suscipit eros. Suspendisse id facilisis velit. Nunc justo ligula, laoreet sed quam vitae, rhoncus aliquet sapien. Ut tempor, elit ac volutpat volutpat, sem eros elementum arcu, elementum sagittis neque nibh et justo. Cras sit amet iaculis erat, nec molestie tortor. Pellentesque rutrum aliquet ultricies.Aliquam scelerisque mi malesuada dictum rhoncus. Mauris eleifend cursus tortor, nec ornare elit rhoncus elementum. Phasellus vulputate nisl at ligula ullamcorper, non luctus metus ullamcorper. Mauris et diam augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris volutpat lacus mauris, sed condimentum dolor pretium id. Etiam pulvinar mollis luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus viverra lorem. Morbi ornare nibh libero, ac porttitor neque pharetra non. Nullam luctus sodales ultricies. Duis pretium eget libero aliquam vestibulum. Cras fermentum vehicula neque a scelerisque.Cras sodales ipsum nec ligula ullamcorper rutrum et vel mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris fringilla, diam quis viverra euismod, enim eros commodo enim, vitae placerat sapien sapien sed eros. Integer eleifend magna ac tortor bibendum pretium. Vestibulum vel vestibulum metus, vel fringilla ipsum. Vestibulum vitae felis et quam ultrices venenatis ut eget purus. Aliquam consequat augue a eros auctor, id molestie ligula faucibus. Nullam pretium orci sed imperdiet euismod. Curabitur quis auctor sapien. Aliquam erat volutpat. Ut velit ante, congue sit amet tristique non, ullamcorper quis mi. Nunc at velit ac lacus porttitor iaculis id ut lectus.Donec mollis a nisl eget maximus. Nulla ac lacus tellus. Nam porttitor pulvinar purus nec pretium. Suspendisse ullamcorper congue nibh, et imperdiet dolor finibus et. Nulla facilisi. Nulla nec risus dignissim, tristique erat in, scelerisque ante. Nulla ornare in elit quis facilisis. Aenean et elementum justo. Sed aliquam odio in ex aliquet, eu condimentum lacus luctus. Ut dapibus diam eros, sed lobortis libero auctor eu. Vestibulum sed justo mollis, porta enim blandit, blandit elit. Duis mollis, libero non tristique porta, nulla tellus facilisis ex, nec tincidunt justo augue ac urna. Aenean blandit nisi ex, at suscipit odio tempor vitae. Suspendisse in interdum mauris.`,
    status: 'отказано'
  },
)
</script>
<template>
  <v-container>
    <BackButton></BackButton>
    <v-row class="mt-2">
      <v-col cols="12">
        <p class="text-2xl font-semibold"> {{ homework.lesson }} {{ homework.date }}</p>
      </v-col>
      <v-col cols="12" md="4" lg="3">
        <v-row>
          <v-col cols="12" md="4" class='flex flex-row'>
            <p class="text-lg">{{ homework.name }}</p>
          </v-col>
          <v-col cols="12" md="8">
            <v-select density="compact" label="статус" :items="['Отказано', 'Принято']" variant="outlined"></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="6">
            <v-carousel>
              <v-carousel-item
                src="https://st3.depositphotos.com/1036149/12503/i/950/depositphotos_125030764-stock-photo-funny-pig-holding-beer.jpg"
                cover></v-carousel-item>
              <v-carousel-item
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCwhEWq3nmib6yB691Ek36dzSN8XrnPxSEwQ&s"
                cover></v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col cols="12" md="6">
            <p class="text-base">{{ homework.text }}</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-textarea label="Комментарий" variant="outlined"></v-textarea>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn size="x-large">отправить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>