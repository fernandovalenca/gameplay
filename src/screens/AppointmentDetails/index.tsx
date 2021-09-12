import React, { Fragment, useEffect, useState } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import * as Linking from 'expo-linking';
import {
  ImageBackground,
  View,
  Text,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';

import {
  Background,
  ButtonIcon,
  Header,
  ListDivider,
  ListHeader,
  Member,
  Load,
} from '../../components';

import { AppointmentProps } from '../../components/Appointment';
import { MemberProps } from '../../components/Member';
import { api } from '../../services/api';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

const { CDN_IMAGE } = process.env;

import BannerImg from '../../assets/banner.png';

interface ParamsProps {
  guildSelected: AppointmentProps;
}

interface GuildWidgetProps {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidgetProps>(
    {} as GuildWidgetProps
  );
  const [loading, setLoading] = useState(true);

  const { primary } = theme.colors;
  const route = useRoute();
  const { guildSelected } = route.params as ParamsProps;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );

      setWidget(response.data);
    } catch (error) {
      Alert.alert('Verifique no servidor se a opção Widget está habilitada.');
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvatation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title='Detalhes'
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvatation}>
              <Fontisto name='share' size={20} color={primary} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground
        source={{
          uri: `${CDN_IMAGE}/icons/${guildSelected.guild.id}/${guildSelected.guild.icon}.png`,
        }}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>
      {loading ? (
        <Load />
      ) : (
        <Fragment>
          <ListHeader
            title='Jogadores'
            subtitle={`Total de ${widget.members?.length}`}
          />
          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={ListDivider}
            style={styles.members}
          />

          {guildSelected.guild.owner && (
            <View style={styles.footer}>
              <ButtonIcon title='Entrar na Partida' onPress={handleOpenGuild} />
            </View>
          )}
        </Fragment>
      )}
    </Background>
  );
}
