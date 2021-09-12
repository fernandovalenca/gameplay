import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import uuid from 'react-native-uuid';
import { Feather } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Background,
  Button,
  CategorySelect,
  Header,
  ModalView,
  SmallInput,
  TextArea,
  GuildIcon,
} from '../../components';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { useNavigation } from '@react-navigation/native';

interface FormProps {
  day: string;
  month: string;
  hour: string;
  minute: string;
  description: string;
}

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const navigation = useNavigation();

  const { handleSubmit, control } = useForm();

  function handleOpenGuildsModal() {
    setOpenGuildsModal(!openGuildsModal);
  }

  function handleGuildSelect(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave({
    day,
    month,
    hour,
    minute,
    description,
  }: FormProps) {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title='Agendar partida' />

          <Text
            style={[
              styles.label,
              { marginTop: 36, marginBottom: 18, marginLeft: 24 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuildsModal}>
              <View style={styles.select}>
                <GuildIcon guildId={guild.id} iconId={guild.icon} />
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather
                  name='chevron-right'
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.fieldsGroup}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>

                <View style={styles.fields}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <SmallInput
                        maxLength={2}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name='day'
                    defaultValue=''
                  />
                  <Text style={styles.divider}>/</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <SmallInput
                        maxLength={2}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name='month'
                    defaultValue=''
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>

                <View style={styles.fields}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <SmallInput
                        maxLength={2}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name='hour'
                    defaultValue=''
                  />
                  <Text style={styles.divider}>:</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <SmallInput
                        maxLength={2}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name='minute'
                    defaultValue=''
                  />
                </View>
              </View>
            </View>

            <View style={[styles.fieldsGroup, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracteresLimit}>
                Máximo de 100 caracteres
              </Text>
            </View>

            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  maxLength={100}
                  multiline
                  numberOfLines={5}
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='description'
              defaultValue=''
            />

            <View style={styles.footer}>
              <Button title='Agendar' onPress={handleSubmit(handleSave)} />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView closeModal={handleOpenGuildsModal} visible={openGuildsModal}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
