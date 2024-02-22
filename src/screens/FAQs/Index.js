import { FlatList, Image, View } from 'react-native'
import React, { useState } from 'react'
import CollapsableView from '../../components/CollapsableView/Index'
import Header from '../../components/Header/Index'
import styles from './Style';

const FAQs = ({navigation}) => {

    const Faqs = [
        { question: 'Lorem Ipsum is simply dummy text?', answer: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.e or Google Play. The download price is €1.99.' },
        { question: 'Lorem Ipsum is simply dummy text?', answer: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.e or Google Play. The download price is €1.99.' },
        { question: 'Lorem Ipsum is simply dummy text?', answer: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.e or Google Play. The download price is €1.99.' },
        { question: 'Lorem Ipsum is simply dummy text?', answer: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.e or Google Play. The download price is €1.99.' },
        { question: 'Lorem Ipsum is simply dummy text?', answer: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.e or Google Play. The download price is €1.99.' },
        { question: 'Lorem Ipsum is simply dummy text?', answer: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.e or Google Play. The download price is €1.99.' },
        { question: 'Lorem Ipsum is simply dummy text?', answer: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.e or Google Play. The download price is €1.99.' },
    ]

    const [collapsedItems, setCollapsedItems] = useState(Array(Faqs.length).fill(true));

  const handlePress = (index) => {
    const newCollapsedItems = [...collapsedItems];
    newCollapsedItems[index] = !collapsedItems[index];
    setCollapsedItems(newCollapsedItems);
  };

  const renderFaqs = ({ item, index }) => (
    <View style={styles.CollapseContainer}>
    <CollapsableView
      onPress={() => handlePress(index)}
      collapsed={collapsedItems[index]}
      question={item?.question}
      answer={item?.answer}
      arrowIcon={collapsedItems[index] ? <Image style={styles.toparrow} source={require('../../assets/images/down-arrow.png')}/>:<Image style={styles.downarrow} source={require('../../assets/images/top-arrow.png')}/>}
    />
    </View>
  );

  const renderHeader = () => {
    return (
        <Header text="FAQs" onpress={()=>navigation.goBack()}/>
    );
  };

  return (
    <View style={styles.Container}>
      <FlatList
        data={Faqs}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: '6%' }}
        renderItem={renderFaqs}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => index.toString()}
      />
     </View>

  )
}

export default FAQs