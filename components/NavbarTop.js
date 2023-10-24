import { View, Text } from 'react-native'
import React from 'react'

// icon
import { CalendarIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

const NavbarTop = () => {
  return (
    <View
      className='flex-row justify-between mt-1 px-2 py-3 items-center absolute top-0 right-0 left-0 z-30'
    >
      {/* live button */}
      <View
        className='flex-row items-center'
      >
        <CalendarIcon size={30} color={'#fff'}/>
        <Text className='text-white left-[-25px] text-[10px] top-1'>LIVE</Text>
      </View>

      {/* button folowing and fyp */}
      <View
        className='flex-row gap-2'
      >
        <Text className='text-gray-300 font-semibold'>Following</Text>
        <View
          className='border-b-2 border-white pb-1'
        >
          <Text className='text-white font-semibold'>For You</Text>
        </View>
      </View>

      {/* search button */}
      <View>
        <MagnifyingGlassIcon size={30} color={'#fff'}/>
      </View>
    </View>
  )
}

export default NavbarTop